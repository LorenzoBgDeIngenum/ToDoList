namespace Api.Model;

public class User
{
    public int Id { get; set; }
    public string? Mail { get; set; }
    public string? Password { get; set; }
    public List<int> ToDoLists { get; set; }
}