using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class UpdateTaskUseCase : IUpdateTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public UpdateTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(int id,UpdateTaskDTO taskToUpdate)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null){
            return null;
        }
        task.UpdateTaskItem(taskToUpdate.Name, taskToUpdate.Description, taskToUpdate.DueDate);
        return await _taskRepository.UpdateAsync(task);
    }
}