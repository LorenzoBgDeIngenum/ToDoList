using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController
{
    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetUser")]
    public ActionResult<User> GetUser()
    {
        var user = new User();
        user.Id = 1;
        user.Mail = "admin@admin.com";
        user.Password = "123456";
        
        return user;
    }

    [HttpPost(Name = "PostUser")]
    public ActionResult<User> PostUser(User user)
    {
        user.Id = 1;
        user.Mail = "admin@admin.com";
        user.Password = "123456";
        
        return user;
    }
}