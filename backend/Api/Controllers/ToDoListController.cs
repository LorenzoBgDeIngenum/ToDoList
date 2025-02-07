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
    public ActionResult<IEnumerable<ToDoList>> GetToDoLists()
    {
        
        return Ok(_context.ToDoLists.ToList());
    }
    
    // GET: /ToDoList/1
    [HttpGet("{id}")]
    public ActionResult<ToDoList> GetToDoList(int id)
    {
        var toDoList = _context.ToDoLists.Find(id);
        if (toDoList == null) return NotFound();
        
        return Ok(toDoList);
    }
    
    // GET: /ToDoList/byUserId/{userId}
    [HttpGet("byUserId/{userId}")]
    public ActionResult<IEnumerable<ToDoList>> GetToDoListsByUserId(int userId)
    {
        var toDoLists = _context.ToDoLists.Where(t => t.UserId == userId).ToList();
    
        if (toDoLists == null || !toDoLists.Any())
        {
            
            return NotFound($"No to-do lists found for user with ID {userId}");
        }

        return Ok(toDoLists);
    }

    // POST: /ToDoList/add
    [HttpPost("add")]
    public ActionResult<ToDoList> CreateToDoList(ToDoList toDoList)
    {   
        _context.ToDoLists.Add(toDoList);
        _context.SaveChanges();

        var columns = new List<Column>
        {
            new Column { Name = "To Do", ListId = toDoList.Id, Order = 1 },
            new Column { Name = "In Progress", ListId = toDoList.Id, Order = 2 },
            new Column { Name = "Done", ListId = toDoList.Id, Order = 3 }
        };
        
        _context.Columns.AddRange(columns);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetToDoList), new { id = toDoList.Id }, toDoList);
    }
}