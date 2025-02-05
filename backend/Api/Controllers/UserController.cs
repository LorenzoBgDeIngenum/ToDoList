using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly DatabaseContext _context;

    public UserController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: /User
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetUsers()
    {
        return Ok(_context.Users.ToList());
    }

    // GET: /User/1
    [HttpGet("{id}")]
    public ActionResult<User> GetUser(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();
        return Ok(user);
    }
    
    // GET: /User/mail/email
    [HttpGet("mail/{mail}")]
    public ActionResult<User> GetUser(string mail)
    {
        var user = _context.Users.SingleOrDefault(u => u.Mail == mail);
        if (user == null) return NotFound();
        return Ok(user);
    }

    // POST: /User/add
    [HttpPost("add")]
    public ActionResult<User> CreateUser(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }
    
    // POST: /User/login
    [HttpPost("login")]
    public ActionResult<User> Login(User user)
    {
        var userRep = _context.Users.FirstOrDefault(u => u.Mail.Equals(user.Mail) && u.Password.Equals(user.Password));
        if (userRep == null) return Unauthorized();
        return Ok(userRep);
    }
}