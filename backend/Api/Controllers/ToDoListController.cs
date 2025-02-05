using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDoListController : ControllerBase
{
    private readonly DatabaseContext _context;

    public ToDoListController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: /ToDoList
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetToDoLists()
    {
        return Ok(_context.ToDoLists.ToList());
    }

}