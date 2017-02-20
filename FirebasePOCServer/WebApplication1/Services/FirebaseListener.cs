using FirebaseSharp.Portable;
using Microsoft.AspNet.SignalR;
//using FireSharp.Interfaces;
//using FireSharp.Response;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using WebApplication1.Controllers;
using WebApplication1.Hubs;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class FirebaseListener : IFirebaseListener
    {
        private Queue<string> _mensagensPendentes = new Queue<string>();

        public IHubConnectionContext<dynamic> Clients;
        public IConnection Connection;
        public FirebaseApp Firebase;

        //private Task<EventStreamResponse> sessaoEvent;
        //private Task<EventStreamResponse> mensagensEvent;

        public FirebaseListener(IHubConnectionContext<dynamic> clients, FirebaseApp firebase)
        {
            this.Clients = clients;
            this.Firebase = firebase;

            this.Firebase.Child("mensagens")
                         .LimitToLast(1)
                         .On("child_added", (snapshot, child, context) =>
                         {
                             if (PushHub.ClientesConectados > 0)
                                 this.Clients.All.onNovaSessao(snapshot.ExportVal());
                             else
                                 this._mensagensPendentes.Enqueue(snapshot.ExportVal());
                         });
        }

        private long _totalMensagens = 0;
        private DateTime? _inicio;

        public FirebaseListener(IConnection connection, FirebaseApp firebase)
        {
            this.Connection = connection;
            this.Firebase = firebase;

            this.Firebase.Child("mensagens")
                         .On("child_added", (snapshot, child, context) =>
                         {
                             this.Connection.Broadcast(snapshot.ExportVal());
                         });
        }

        public Queue<string> MensagensPendentes
        {
            get
            {
                return this._mensagensPendentes;
            }
        }
    }
} 