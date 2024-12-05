import type { Metadata } from 'next';
import { contactSite } from '@/data/site';
import MotionWrapper from '../_components/motion/motionWrapper';
import Title from '../_components/elements/title/Index';
import * as Contact from '@/features/contact/conponents/Index';

export const metadata: Metadata = {
  title: contactSite.title,
  description: contactSite.description,
};

export default async function ContactPage() {
  return (
    <>
      <Title text="Contact" />
      <Contact.ContactText />
      <MotionWrapper>
        <Contact.ContactWrapper />
      </MotionWrapper>
    </>
  );
}
