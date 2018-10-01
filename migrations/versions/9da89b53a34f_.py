"""empty message

Revision ID: 9da89b53a34f
Revises: d6e1fa7ef39d
Create Date: 2018-09-13 15:35:37.051641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9da89b53a34f'
down_revision = 'd6e1fa7ef39d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('total', sa.Numeric(precision=10, scale=2), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('order', 'total')
    # ### end Alembic commands ###