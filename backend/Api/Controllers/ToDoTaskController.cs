using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDoTaskController : ControllerBase
{
    private readonly DatabaseContext _context;

    public ToDoTaskController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: /ToDoTask
    [HttpGet]
    public ActionResult<IEnumerable<ToDoTask>> GetToDoTasks()
    {
        return Ok(_context.ToDoTasks.ToList());
    }
    
    // GET: /ToDoTask/byColumnId/listId
    [HttpGet("byColumnId/{columnId}")]
    public ActionResult<IEnumerable<ToDoTask>> GetToDoTask(int columnId)
    {
        var tasks = _context.ToDoTasks.Where(t => t.ColumnId.Equals(columnId)).ToList();
        return Ok(tasks);
    }

    
    
}