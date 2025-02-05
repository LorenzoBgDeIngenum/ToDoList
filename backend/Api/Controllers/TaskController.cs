using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly DatabaseContext _context;

    public TaskController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: /Task
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetUsers()
    {
        return Ok(_context.Users.ToList());
    }

    
    
}