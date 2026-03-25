import { Worker } from 'bullmq';
import { connection } from './connection';
import { Resend } from 'resend';

new Worker(
  'email-queue',
  async (job) => {
    const { email, type, msg } = job.data;

    console.log(`Enviando email para ${email} - tipo: ${type}`);

    // simulação
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: type,
        html: msg
      });

      if (error) {
        console.error('Erro retornado pelo Resend:', error);
        return;
      }

      console.log('E-mail enviado com sucesso! ID:', data?.id);
    } catch (err) {
      console.error('Falha ao conectar no Resend:', err);
    }

    //await new Promise((resolve) => setTimeout(resolve, 2000));
  },
  { connection }
);