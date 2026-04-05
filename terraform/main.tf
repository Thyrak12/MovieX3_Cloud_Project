# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "moviex3-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "moviex3-igw"
  }
}

# Subnets in different AZs
resource "aws_subnet" "subnet_1a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_1a_cidr
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "moviex3-subnet-1a"
  }
}

resource "aws_subnet" "subnet_1b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_1b_cidr
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "moviex3-subnet-1b"
  }
}

# Route table
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "moviex3-rt"
  }
}

resource "aws_route_table_association" "subnet_1a" {
  subnet_id      = aws_subnet.subnet_1a.id
  route_table_id = aws_route_table.main.id
}

resource "aws_route_table_association" "subnet_1b" {
  subnet_id      = aws_subnet.subnet_1b.id
  route_table_id = aws_route_table.main.id
}

