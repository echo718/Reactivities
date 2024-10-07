using System.Security.Claims;
using API.Dtos;
using API.Service;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

            if (result)
            {
                return CreatUserDto(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == registerDto.UserName.ToLower()))
            {
                ModelState.AddModelError("userName", "userName taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.Email.ToLower() == registerDto.Email.ToLower()))
            {
                ModelState.AddModelError("email", "email taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreatUserDto(user);
            }

            return BadRequest("Problem registering user");
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreatUserDto(user);

        }

        private UserDto CreatUserDto(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Image = null,
                Token = _tokenService.CreateToken(user),

            };
        }
    }
}