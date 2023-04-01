from typing import Any
from typing import List
from typing import Optional
from typing import Union

import numpy as np
from pydantic import BaseModel
from pydantic import validator


class AssignmentMatrixInfo(BaseModel):
    is_profit_matrix: Optional[bool] = False
    matrix: List[List[Union[int, float]]]

    @validator("matrix")
    def matrix_must_contain_on_positives(cls, v):
        matrix_data = np.array(v)
        if (matrix_data < 0).any():
            raise ValueError("Matrix cannot contain a negetive value")
        return v


class IterationsRead(BaseModel):
    initial_matrix: List[Union[int, float, Any]]
    covered_rows: Union[int, Any]
    covered_columns: Union[int, Any]
    total_covered: Union[int, Any]


class SolutionRead(BaseModel):
    results: Optional[List[Union[int, Any]]]  # type: ignore
    total_cost: Optional[int] = 0
    row_reduction: Optional[List[Union[int, float, Any]]]
    column_reduction: Optional[List[Union[int, float, Any]]]
    iterations: Optional[List[IterationsRead]]
