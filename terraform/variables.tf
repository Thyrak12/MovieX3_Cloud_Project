variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_1a_cidr" {
  description = "Subnet in AZ 1a"
  type        = string
  default     = "10.0.1.0/24"
}

variable "subnet_1b_cidr" {
  description = "Subnet in AZ 1b"
  type        = string
  default     = "10.0.2.0/24"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "EC2 key pair name"
  type        = string
}

variable "ssh_allowed_cidr" {
  description = "Your IP for SSH access (example: 203.0.113.10/32)"
  type        = string
}

variable "bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "db_name" {
  description = "RDS database name"
  type        = string
  default     = "movie_x3"
}

variable "db_username" {
  description = "RDS master username"
  type        = string
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}
