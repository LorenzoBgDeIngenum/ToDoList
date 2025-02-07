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
        try
        {
            var columns = _context.Columns.ToList();
            
            return Ok(columns);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET: /Column/byListId/{listId}
    [HttpGet("byListId/{listId}")]
    public ActionResult<IEnumerable<Column>> GetColumnsByListId(int listId)
    {
        try
        {
            var columns = _context.Columns.Where(c => c.ListId == listId).ToList();
            if (columns == null || !columns.Any()) return NotFound("No columns found for the provided listId.");
            
            return Ok(columns);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST: /Column/add
    [HttpPost("add")]
    public ActionResult<Column> CreateColumn(Column column)
    {
        try
        {
            _context.Columns.Add(column);
            _context.SaveChanges();
            
            return CreatedAtAction(nameof(GetColumnsByListId), new { listId = column.ListId }, column);
        }
        catch (Exception ex)
        {
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}