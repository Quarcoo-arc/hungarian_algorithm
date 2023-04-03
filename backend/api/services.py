from algorithm import Hungarian
from schemas import AssignmentMatrixInfo
from schemas import SolutionRead

# from docx import Document
# from docx.enum.table import WD_TABLE_ALIGNMENT
# from docx.enum.text import WD_LINE_SPACING
# from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT


def solve_problem(data: AssignmentMatrixInfo):
    hungarian = Hungarian(data.matrix, is_profit_matrix=data.is_profit_matrix)  # type: ignore
    hungarian.calculate()
    return hungarian.get_output()


def generate_word_document(data: SolutionRead):
    ...
