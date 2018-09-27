"""empty message

Revision ID: a9c7e415e7b5
Revises: 1dab885b5839
Create Date: 2018-09-26 18:31:39.278548

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9c7e415e7b5'
down_revision = '1dab885b5839'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('category', 'parentID',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('task', 'content_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.add_column('user', sa.Column('device_token', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'device_token')
    op.alter_column('task', 'content_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('category', 'parentID',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
