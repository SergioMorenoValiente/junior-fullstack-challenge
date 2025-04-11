using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface ISetTaskPriorityUseCase
{
    Task<TaskItem> ExecuteAsync(int id, int priority);
}