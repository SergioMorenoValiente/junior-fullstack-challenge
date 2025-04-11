using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;

namespace LebenChallenge.Application.UseCases;

public class DeleteTaskUseCase : IDeleteTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public DeleteTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<bool> ExecuteAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null)
        {
            return false; 
        }
        await _taskRepository.DeleteAsync(id);
        return true; 
    } 
}
