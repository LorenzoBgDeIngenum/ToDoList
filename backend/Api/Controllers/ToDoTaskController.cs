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
    
    // GET: /ToDoTask/byColumnId/columnId
    [HttpGet("byColumnId/{columnId}")]
    public ActionResult<IEnumerable<ToDoTask>> GetToDoTasks(int columnId)
    {
        var tasks = _context.ToDoTasks.Where(t => t.ColumnId.Equals(columnId)).ToList();
        return Ok(tasks);
    }
    
    // POST: /ToDoTask/add
    [HttpPost("add")]
    public ActionResult<ToDoTask> CreateToDoTask(ToDoTask toDoTask)
    {
        _context.ToDoTasks.Add(toDoTask);
        _context.SaveChanges();
        return CreatedAtAction(nameof(CreateToDoTask), new { id = toDoTask.Id }, toDoTask);
    }
    
    // DELETE: /ToDoTask/id
    [HttpDelete("{id}")]
    public ActionResult<ToDoTask> DeleteToDoTask(int id)
    {
        var t = _context.ToDoTasks.First(t => t.Id == id);
        _context.ToDoTasks.Remove(t);
        _context.SaveChanges();
        return Ok();
    }
    
    // PUT: /ToDoTask
    [HttpPut]
    public ActionResult PutToDoTask(ToDoTask toDoTask)
    {
        try
        {
            var t = _context.ToDoTasks.Find(toDoTask.Id);
            if (t == null)
            {
                return NotFound("Task not found.");
            }

            if (toDoTask.ColumnNumber < 1 || toDoTask.ColumnNumber > 3 ||
                (toDoTask.ColumnNumber != t.ColumnNumber + 1 && toDoTask.ColumnNumber != t.ColumnNumber - 1))
            {
                return BadRequest("Invalid column number.");
            }
            t.ColumnId = toDoTask.ColumnId;
            t.Description = toDoTask.Description;
            t.Name = toDoTask.Name;
            t.ColumnNumber = toDoTask.ColumnNumber;
            _context.SaveChanges();

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest($"An error occurred: {e.Message}");
        }
    }
    
}