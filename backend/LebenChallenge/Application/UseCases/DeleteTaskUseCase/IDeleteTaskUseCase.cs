using LebenChallenge.Application.DTO;

namespace LebenChallenge.Application.UseCases;

public interface IDeleteTaskUseCase
{
    Task<bool> ExecuteAsync(int id);
}
