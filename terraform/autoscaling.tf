resource "aws_launch_template" "backend_1a" {
  name_prefix   = "moviex3-lt-1a-"
  image_id      = "ami-020085dfd1b951d4c"
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y git
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
    yum install -y nodejs
    npm install -g pm2
    echo "ASG backend setup complete on AZ 1a"
  EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "moviex3-asg-backend-1a"
    }
  }
}

resource "aws_launch_template" "backend_1b" {
  name_prefix   = "moviex3-lt-1b-"
  image_id      = "ami-02edd2ec938626d55"
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y git
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
    yum install -y nodejs
    npm install -g pm2
    echo "ASG backend setup complete on AZ 1b"
  EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "moviex3-asg-backend-1b"
    }
  }
}

resource "aws_autoscaling_group" "backend_1a" {
  name                = "moviex3-asg-1a"
  min_size            = 1
  max_size            = 2
  desired_capacity    = 1
  vpc_zone_identifier = [aws_subnet.subnet_1a.id]
  health_check_type   = "EC2"

  launch_template {
    id      = aws_launch_template.backend_1a.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "moviex3-asg-backend-1a"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_group" "backend_1b" {
  name                = "moviex3-asg-1b"
  min_size            = 1
  max_size            = 2
  desired_capacity    = 1
  vpc_zone_identifier = [aws_subnet.subnet_1b.id]
  health_check_type   = "EC2"

  launch_template {
    id      = aws_launch_template.backend_1b.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "moviex3-asg-backend-1b"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_attachment" "backend_1a_tg" {
  autoscaling_group_name = aws_autoscaling_group.backend_1a.id
  lb_target_group_arn    = aws_lb_target_group.backend.arn
}

resource "aws_autoscaling_attachment" "backend_1b_tg" {
  autoscaling_group_name = aws_autoscaling_group.backend_1b.id
  lb_target_group_arn    = aws_lb_target_group.backend.arn
}
