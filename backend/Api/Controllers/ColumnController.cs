using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ColumnController : ControllerBase
{
    private readonly DatabaseContext _context;

    public ColumnController(DatabaseContext context)
    {
        _context = context;
    }

    // GET: /Column
    [HttpGet]
    public ActionResult<IEnumerable<Column>> GetColumns()
    {
        return Ok(_context.Columns.ToList());
    }
    
    // GET: /Column/byListId/listId
    [HttpGet("byListId/{listId}")]
    public ActionResult<IEnumerable<Column>> GetColumns(int listId)
    {
        var columns = _context.Columns.Where(t => t.ListId.Equals(listId)).ToList();
        return Ok(columns);
    }
    
    // POST: /Column/add
    [HttpPost("add")]
    public ActionResult<Column> CreateColumn(Column column)
    {
        _context.Columns.Add(column);
        _context.SaveChanges();
        return CreatedAtAction(nameof(CreateColumn), new { id = column.Id }, column);
    }
    
}