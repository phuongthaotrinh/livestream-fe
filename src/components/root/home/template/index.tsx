'use client'
import {WhoAmI} from "@/components/root/home/components/who-am-i"
import {PowerOfUs} from "@/components/root/home/components/power-of-us"
import {Community} from "@/components/root/home/components/community";
import {EnsureASafe} from "@/components/root/home/components/ensure-a-safe";
import {Contact} from "@/components/root/home/components/contact";
import {Subscridbe} from "@/components/root/home/components/subscribe";
import {AnimatePresence, motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import {useAuth} from "@/lib/hooks/use-auth";


export default function RootPageTemplate() {

    function Section({children}: { children: React.ReactNode }) {
        const animation = {
            initial: {y: "100%"},
            enter: (i: any) => ({y: "0", transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i}})
        }

        const {ref, inView, entry} = useInView({
            threshold: 0.75,
            triggerOnce: true
        });
        return (
            <section ref={ref}>
                <motion.div variants={animation} initial="initial" animate={inView ? "enter" : ""}>
                    {children}
                </motion.div>
            </section>
        );
    }
    const {profile} = useAuth();
    return (
        <div className='bg-white'>
            <div className="pt-10 pb-10 ">
                <div className="bg-gradient-to-b from-[#fff] to-[#e7edf5]">
                    <Section><WhoAmI/></Section>
                </div>
                <div className="container">
                    <Section> <PowerOfUs/></Section>
                    <Section> <Community/></Section>
                    <Section> <EnsureASafe/></Section>
                    <Section> <Contact/></Section>
                    <Subscridbe/>
                </div>

            </div>

        </div>
    )
}