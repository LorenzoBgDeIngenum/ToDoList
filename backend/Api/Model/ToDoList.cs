namespace Api.Model;

public class ToDoList
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<string> Columns { get; set; }
    public List<int> Tasks { get; set; }
}