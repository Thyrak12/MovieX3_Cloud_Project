resource "aws_db_subnet_group" "main" {
  name       = "moviex3-db-subnet-group"
  subnet_ids = [aws_subnet.subnet_1a.id, aws_subnet.subnet_1b.id]

  tags = {
    Name = "moviex3-db-subnet-group"
  }
}

resource "aws_security_group" "rds_sg" {
  name   = "moviex3-rds-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "moviex3-rds-sg"
  }
}

resource "aws_db_instance" "mysql" {
  identifier             = "moviex3-mysql"
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = var.db_instance_class
  allocated_storage      = 20
  storage_type           = "gp3"
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  publicly_accessible    = true
  multi_az               = false
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  deletion_protection    = false

  tags = {
    Name = "moviex3-mysql"
  }
}