using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        // [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$", ErrorMessage = "Password should be at least one number and one letter, minimum length 8")]
        public string Password { get; set; }
        public string DisplayName { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}