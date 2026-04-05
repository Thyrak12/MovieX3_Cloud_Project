resource "aws_security_group" "alb_sg" {
  name   = "moviex3-alb-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "moviex3-alb-sg"
  }
}

resource "aws_lb" "backend" {
  name               = "moviex3-alb-app"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.subnet_1a.id, aws_subnet.subnet_1b.id]

  tags = {
    Name = "moviex3-alb"
  }
}

resource "aws_lb_target_group" "backend" {
  name     = "moviex3-tg-app"
  port     = 5000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/health"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    matcher             = "200-399"
  }

  tags = {
    Name = "moviex3-tg"
  }
}

resource "aws_lb_target_group_attachment" "backend_1a" {
  target_group_arn = aws_lb_target_group.backend.arn
  target_id        = aws_instance.backend_1a.id
  port             = 5000
}

resource "aws_lb_target_group_attachment" "backend_1b" {
  target_group_arn = aws_lb_target_group.backend.arn
  target_id        = aws_instance.backend_1b.id
  port             = 5000
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.backend.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}
