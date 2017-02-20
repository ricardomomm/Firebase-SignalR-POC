using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Ninject;
using WebApplication1.Infrastructure;
using WebApplication1.Services;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using WebApplication1.Hubs;
using Microsoft.AspNet.SignalR;
using FirebaseSharp.Portable;
using WebApplication1.Controllers;
//using FireSharp.Config;
//using FireSharp.Interfaces;
//using FireSharp;

[assembly: OwinStartup(typeof(WebApplication1.App_Start.Startup))]

namespace WebApplication1.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var kernel = new StandardKernel();
            var resolver = new NinjectSignalRDependencyResolver(kernel);

            kernel.Bind<IFirebaseListener>()
                .To<FirebaseListener>()
                .InSingletonScope();

            kernel.Bind(typeof(IHubConnectionContext<dynamic>)).ToMethod(context =>
                    resolver.Resolve<IConnectionManager>().GetHubContext<PushHub>().Clients
                     ).WhenInjectedInto<IFirebaseListener>();

            kernel.Bind<FirebaseApp>()
                .ToConstructor((a) => new FirebaseApp(new Uri("https://fir-poc-fe6af.firebaseio.com/"), null));

            // Forçar inicialização
            kernel.Get<IFirebaseListener>();

            var config = new HubConfiguration();
            config.Resolver = resolver;
            
            app.MapSignalR(config);

            var kernelConnection = new StandardKernel();
            var resolverConnection = new NinjectSignalRDependencyResolver(kernel);

            kernelConnection.Bind<IFirebaseListener>()
                .To<FirebaseListener>()
                .InSingletonScope();

            kernelConnection.Bind(typeof(IConnection)).ToMethod(context =>
                    resolver.Resolve<IConnectionManager>().GetConnectionContext<PushConnection>().Connection
                     ).WhenInjectedInto<IFirebaseListener>();

            kernelConnection.Bind<FirebaseApp>()
                .ToConstructor((a) => new FirebaseApp(new Uri("https://fir-poc-fe6af.firebaseio.com/"), null));

            // Forçar inicialização
            kernelConnection.Get<IFirebaseListener>();
            
            app.MapSignalR<PushConnection>("/TestConnection", new ConnectionConfiguration()
            {
                Resolver = resolverConnection
            });
        }
    }
}
