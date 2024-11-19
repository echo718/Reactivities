using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }

        public string Boday { get; set; }

        public AppUser Author { get; set; }

        public Activity Activity { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}