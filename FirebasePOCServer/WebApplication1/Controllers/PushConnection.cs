using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using WebApplication1.Services;
using System.Threading;

namespace WebApplication1.Controllers
{

    public class PushConnection : PersistentConnection
    {
       


        private readonly IFirebaseListener _firebaseListener;

        public PushConnection(IFirebaseListener firebaseListener)
        {
            _firebaseListener = firebaseListener;
        }
        
    }

    public enum ConnectionBehavior
    {
        ListenOnly,
        Echo,
        Broadcast
    }
}