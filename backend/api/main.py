import uvicorn
from fastapi import FastAPI
from schemas import AssignmentMatrixInfo
from schemas import SolutionRead
from services import solve_problem

app = FastAPI(title="Hungarian Algorithm API", version="0.1.0")


@app.post("/document")
async def generate_word_solution():
    """
    Generate a word document containing the solution to the
    Assignment problem.

    Not Yet Implemented.
    """
    ...


@app.post("/assignment-problem", response_model=SolutionRead)
def solve_assignment_problem(matrix_data: AssignmentMatrixInfo):
    return solve_problem(matrix_data)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)
