from typing import List
from typing import Union

from algorithm import Hungarian
from schemas import AssignmentMatrixInfo


def solve_problem(data: AssignmentMatrixInfo):
    hungarian = Hungarian(data.matrix, is_profit_matrix=data.is_profit_matrix)  # type: ignore
    hungarian.calculate()
    return hungarian.get_output()
