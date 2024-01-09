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
        List<Foodshelf> foodshelves = mailMapper.findFoodshelvesWithExpirationDate();

        for (Foodshelf foodshelf : foodshelves) {
            LocalDate today = LocalDate.now();
            LocalDate notificationDate = foodshelf.getExpirationDate().minusDays(foodshelf.getSendingTimes());

            if (today.isEqual(notificationDate) || today.isAfter(notificationDate)) {
                sendNotificationEmail(foodshelf);
            }
        }
    }

    private void sendNotificationEmail(Foodshelf foodshelf) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("tora17815@gmail.com");
        msg.setSubject("[Notification] 賞味期限が近づいています");
        msg.setText("以下の食品の賞味期限が近づいています。"
                + "\n食品名：" + foodshelf.getFoodName()
                + "\n賞味期限：" + foodshelf.getExpirationDate()
                + "\n通知回数：" + foodshelf.getSendingTimes());
        mailSender.send(msg);
    }
}
