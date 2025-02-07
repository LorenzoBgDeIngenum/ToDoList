using Api.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
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

                var column = _context.Columns.Find(toDoTask.ColumnId);
                if (column == null)
                {
                    
                    return NotFound("Column not found.");
                }

                if (!IsValidColumnOrderChange(t.ColumnId, toDoTask.ColumnId))
                {
                    
                    return BadRequest("Invalid column change based on the order.");
                }

                t.ColumnId = toDoTask.ColumnId;  
                t.Description = toDoTask.Description;
                t.Name = toDoTask.Name;

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                
                return BadRequest($"An error occurred: {e.Message}");
            }
        }
        private bool IsValidColumnOrderChange(int currentColumnId, int newColumnId)
        {
            var currentColumn = _context.Columns.Find(currentColumnId);
            var newColumn = _context.Columns.Find(newColumnId);

            if (currentColumn == null || newColumn == null)
            {
                
                return false;
            }

            if (Math.Abs(currentColumn.Order - newColumn.Order) == 1)
            {
                
                return true;
            }
            
            return false;
        }

        // DELETE: /ToDoTask/id
        [HttpDelete("{id}")]
        public ActionResult DeleteToDoTask(int id)
        {
            var task = _context.ToDoTasks.Find(id);
            if (task == null)
            {
                
                return NotFound("Task not found.");
            }

            _context.ToDoTasks.Remove(task);
            _context.SaveChanges();
            
            return Ok();
        }
    }
}
