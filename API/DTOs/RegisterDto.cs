using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).{4,8}$", ErrorMessage = "Password should be complex")]
        public string Password { get; set; }
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}