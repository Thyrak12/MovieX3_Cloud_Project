# SNS Topic for notification
resource "aws_sns_topic" "cpu_alert" {
  name = "HighCPUAlert"
}

# Email subscription (you must confirm it)
resource "aws_sns_topic_subscription" "email_alert" {
  topic_arn = aws_sns_topic.cpu_alert.arn
  protocol  = "email"
  endpoint  = "sengkim28140@gmail.com"
}

# CloudWatch Alarm
resource "aws_cloudwatch_metric_alarm" "ec2_high_cpu" {
  alarm_name          = "EC2-High-CPU"
  alarm_description   = "Triggers when EC2 CPU exceeds 80% for 5 minutes"

  namespace           = "AWS/EC2"
  metric_name         = "CPUUtilization"
  statistic           = "Average"

  period              = 300              # 5 minutes
  evaluation_periods  = 1                # 1 datapoint
  threshold           = 80               # 80%
  comparison_operator = "GreaterThanThreshold"

  dimensions = {
    InstanceId = "i-0c604b73ed70ab8bc"  # backend server 1
  }

  alarm_actions = [aws_sns_topic.cpu_alert.arn]

  treat_missing_data = "notBreaching"
}