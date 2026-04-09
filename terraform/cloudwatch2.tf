# CloudWatch Alarm
resource "aws_cloudwatch_metric_alarm" "ec2_high_cpu_2" {
  alarm_name          = "EC2-High-CPU-2"
  alarm_description   = "Triggers when EC2 CPU exceeds 80% for 5 minutes"

  namespace           = "AWS/EC2"
  metric_name         = "CPUUtilization"
  statistic           = "Average"

  period              = 300              # 5 minutes
  evaluation_periods  = 1                # 1 datapoint
  threshold           = 80               # 80%
  comparison_operator = "GreaterThanThreshold"

  dimensions = {
    InstanceId = "i-093d4f602212493b7"  # ec2 instace for backend 2
  }

  alarm_actions = [aws_sns_topic.cpu_alert.arn]

  treat_missing_data = "notBreaching"
}