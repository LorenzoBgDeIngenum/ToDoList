namespace Api.Model;

public class ToDoTask
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int ColumnId { get; set; }
}