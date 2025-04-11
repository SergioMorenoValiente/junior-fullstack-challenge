using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class SetTaskPriorityUseCase : ISetTaskPriorityUseCase
{
    private readonly ITaskRepository _taskRepository;

    public SetTaskPriorityUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(int id, int priority)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null || priority < 1 || priority > 5)
        {
            return null;
        }

        task.SetPriority(priority);
        return await _taskRepository.UpdateAsync(task);
    }
}