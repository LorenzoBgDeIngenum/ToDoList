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
    public ActionResult<IEnumerable<User>> GetAllUsers()
    {
        try
        {
            var users = _context.Users.ToList();
            
            return Ok(users);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET: /User/1
    [HttpGet("{id}")]
    public ActionResult<User> GetUser(int id)
    {
        try
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();
            
            return Ok(user);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET: /User/mail/email
    [HttpGet("mail/{mail}")]
    public ActionResult<User> GetUserByMail(string mail)
    {
        try
        {
            var user = _context.Users.SingleOrDefault(u => u.Mail == mail);
            if (user == null) return NotFound();
            
            return Ok(user);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST: /User/add
    [HttpPost("add")]
    public ActionResult<User> CreateUser(User user)
    {
        try
        {
            var existingUser = _context.Users.SingleOrDefault(u => u.Mail == user.Mail);
            if (existingUser != null)
            {
                
                return Conflict("An account with this email already exists.");
            }

            // Hashing the password before storing it.
            user.Password = HashPassword(user.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
            
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST: /User/login
    [HttpPost("login")]
    public ActionResult<User> Login(User user)
    {
        try
        {
            var userRep = _context.Users.FirstOrDefault(u => u.Mail.Equals(user.Mail));
            if (userRep == null || !VerifyPassword(user.Password, userRep.Password))
            {
                
                return Unauthorized("Invalid email or password");
            }
            
            return Ok(userRep);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    private string HashPassword(string password)
    {
        
        return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    }

    private bool VerifyPassword(string enteredPassword, string storedPasswordHash)
    {
        
        return BCrypt.Net.BCrypt.Verify(enteredPassword, storedPasswordHash);
    }
}
