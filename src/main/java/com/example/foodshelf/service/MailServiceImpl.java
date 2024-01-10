package com.example.foodshelf.service;

import com.example.foodshelf.entity.Foodshelf;
import com.example.foodshelf.mapper.MailMapper;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MailServiceImpl implements MailService {

    private final MailMapper mailMapper;
    private final MailSender mailSender;

    public MailServiceImpl(MailMapper mailMapper, MailSender mailSender) {
        this.mailMapper = mailMapper;
        this.mailSender = mailSender;
    }

    @Override
    public void mailSend() {
        List<Foodshelf> FoodshelvesWithExpirationDate = mailMapper.findFoodshelvesWithExpirationDate();

        for (Foodshelf foodshelf : FoodshelvesWithExpirationDate) {
            // 賞味期限の計算
            LocalDate today = LocalDate.now();
            LocalDate expirationDate = foodshelf.getExpirationDate();

            // 賞味期限が未来の場合、かつ、賞味期限がSendingTimesの日数前から通知
            if (expirationDate.isAfter(today) && today.plusDays(foodshelf.getSendingTimes()).isAfter(expirationDate)) {
                sendNotificationEmail(foodshelf);
            }
        }
    }

    private void sendNotificationEmail(Foodshelf foodshelf) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("t4151579@gmail.com");
        msg.setSubject("[Notification] 賞味期限が近づいています");
        msg.setText("以下の食品の賞味期限が近づいています。"
                + "\n食品名：" + foodshelf.getFoodName()
                + "\n賞味期限：" + foodshelf.getExpirationDate()
                + "\n通知回数：" + foodshelf.getSendingTimes());
        mailSender.send(msg);
    }
}
