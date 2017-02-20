using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Web;
using WebApplication1.Models;
using WebApplication1.Services;
using System.Threading.Tasks;

namespace WebApplication1.Hubs
{
    public class PushHub : Hub
    {
        private static long _clientesConectados = 0;
        public static long ClientesConectados
        {
            get
            {
                return Interlocked.Read(ref _clientesConectados);
            }
            private set
            {
                Interlocked.Exchange(ref _clientesConectados, value);
            }
        }

        private readonly IFirebaseListener _firebaseListener;

        public PushHub(IFirebaseListener firebaseListener)
        {
            Trace.Write("Initializing hub");
            _firebaseListener = firebaseListener;
        }
        
        public override Task OnConnected()
        {
            ClientesConectados++;
            return base.OnConnected().ContinueWith((task) =>
            {
                while (this._firebaseListener.MensagensPendentes.Count > 0) {
                    var mensagem = this._firebaseListener.MensagensPendentes.Dequeue();
                    this.Clients.All.onNovaSessao(mensagem);
                }
            });
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            ClientesConectados--;
            return base.OnDisconnected(stopCalled);
        }
    }
}