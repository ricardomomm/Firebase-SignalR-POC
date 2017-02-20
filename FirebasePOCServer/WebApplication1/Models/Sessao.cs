using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{

    public enum SituacaoSessao
    {
        EmEspera,
        Ativa,
        Encerrada
    }

    public class Sessao
    {
        public string id { get; set; }
        public string data { get; set; }
        public SituacaoSessao situacao { get; set; }
    }
}