output "instance_1a_id" {
  description = "EC2 Instance ID in AZ 1a"
  value       = aws_instance.backend_1a.id
}

output "instance_1a_public_ip" {
  description = "EC2 Instance Public IP in AZ 1a"
  value       = aws_instance.backend_1a.public_ip
}

output "instance_1b_id" {
  description = "EC2 Instance ID in AZ 1b"
  value       = aws_instance.backend_1b.id
}

output "instance_1b_public_ip" {
  description = "EC2 Instance Public IP in AZ 1b"
  value       = aws_instance.backend_1b.public_ip
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.mysql.endpoint
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.images.bucket
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.backend.dns_name
}

output "asg_1a_name" {
  description = "Auto Scaling Group name in AZ 1a"
  value       = aws_autoscaling_group.backend_1a.name
}

output "asg_1b_name" {
  description = "Auto Scaling Group name in AZ 1b"
  value       = aws_autoscaling_group.backend_1b.name
}
