using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class CommentDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Boday { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}