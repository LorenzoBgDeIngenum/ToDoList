namespace Api.Model;

public class Task
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int listId { get; set; }
    public int columnNumber { get; set; }
}