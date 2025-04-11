using LebenChallenge.Application.DTO;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface IUpdateTaskUseCase
{
    Task<TaskItem> ExecuteAsync(int id,UpdateTaskDTO taskToUpdate);
}