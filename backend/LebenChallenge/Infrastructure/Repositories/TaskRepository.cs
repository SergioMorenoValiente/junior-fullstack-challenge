using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;
using LebenChallenge.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LebenChallenge.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly InMemoryDbContext _context;

    public TaskRepository(InMemoryDbContext inMemoryDbContext)
    {
        _context = inMemoryDbContext;
    }

    public async Task<TaskItem> AddAsync(TaskItem task)
    {
        TaskItem taskItem = new TaskItem(task.Name, task.Description, task.DueDate);
        _context.Tasks.Add(taskItem);
        await _context.SaveChangesAsync();
        return taskItem;
    }

    public async Task DeleteAsync(int id)
    {
        var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskItem> GetByIdAsync(int id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<TaskItem> UpdateAsync(TaskItem task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
        return task;
    }
}
