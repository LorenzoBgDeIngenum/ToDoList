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
    
    // GET: /ToDoList/byUserId/id
    [HttpGet("byUserId/{id}")]
    public ActionResult<ToDoList> GetToDoLists(int id)
    {
        var toDoLists = _context.ToDoLists.Where(t => t.userId.Equals(id)).ToList();
        return Ok(toDoLists); 
    }
    
    // POST: /ToDoList/add
    [HttpPost("add")]
    public ActionResult<ToDoList> CreateToDoList(ToDoList toDoList)
    {
        _context.ToDoLists.Add(toDoList);
        _context.SaveChanges();
        return CreatedAtAction(nameof(CreateToDoList), new { id = toDoList.Id }, toDoList);
    }

}