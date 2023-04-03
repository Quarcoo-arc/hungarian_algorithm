from typing import Any
from typing import List
from typing import Optional
from typing import Union

import numpy as np
from pydantic import BaseModel
from pydantic import Field
from pydantic import validator


class AssignmentMatrixInfo(BaseModel):
    is_profit_matrix: Optional[bool] = False
    matrix: List[List[Union[int, float]]] = Field(
        ...,
        example=[[10, 15, 16, 18], [14, 13, 16, 10], [11, 9, 8, 18], [13, 13, 11, 9]],
    )

    @validator("matrix")
    def matrix_must_contain_on_positives(cls, v):
        matrix_data = np.array(v)
        if (matrix_data < 0).any():
            raise ValueError("Matrix cannot contain a negetive value")
        return v


class IterationsRead(BaseModel):
    initial_matrix: List[Union[int, float, Any]] = Field(
        ...,
        example=[[10, 15, 16, 18], [14, 13, 16, 10], [11, 9, 8, 18], [13, 13, 11, 9]],
    )
    covered_rows: List[Union[int, Any]] = Field(
        ...,
        example=[0, 2],
    )
    covered_columns: List[Union[int, Any]] = Field(
        ...,
        example=[0, 1, 3],
    )
    total_covered: Union[int, Any]


class SolutionRead(BaseModel):
    cost_matrix: List[Union[int, float, Any]] = Field(
        ...,
        example=[[10, 15, 16, 18], [14, 13, 16, 10], [11, 9, 8, 18], [0, 0, 0, 0]],
    )
    results: Optional[List[Union[int, Any]]]  # type: ignore
    total_cost: Optional[int] = 0
    row_reduction: Optional[List[Union[int, float, Any]]] = Field(
        ...,
        example=[[10, 15, 16, 18], [14, 13, 16, 10], [11, 9, 8, 18], [13, 13, 11, 9]],
    )
    column_reduction: Optional[List[Union[int, float, Any]]] = Field(
        ...,
        example=[[10, 15, 16, 18], [14, 13, 16, 10], [11, 9, 8, 18], [13, 13, 11, 9]],
    )
    iterations: Optional[List[IterationsRead]]
