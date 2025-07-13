
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Skill Assessment",
      description: "Test your knowledge across various tech domains with our comprehensive question bank."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Track Progress",
      description: "Monitor your improvement over time with detailed analytics and performance insights."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Career Ready",
      description: "Prepare for interviews and assessments with industry-relevant questions."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Questions" },
    { number: "50,000+", label: "Tests Taken" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-skillup-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-skillup-gradient rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-skillup-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-skillup-gradient bg-clip-text text-transparent">
                  Level Up Your
                </span>
                <br />
                <span className="text-foreground">
                  Skills Today
                </span>
              </h1>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Master your technical skills with our interactive platform. Test your knowledge, 
                track your progress, and become job-ready with personalized assessments.
              </p>
            </div>

            <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/test"
                className="group skillup-button flex items-center space-x-2 text-lg px-8 py-4 animate-pulse-glow"
              >
                <Zap className="h-5 w-5" />
                <span>Start Your Test</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 font-medium text-lg"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-slide-up grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-skillup-gradient bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="bg-skillup-gradient bg-clip-text text-transparent">SkillUp</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to help you succeed with comprehensive testing and personalized feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="skillup-card p-8 text-center group hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-skillup-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="skillup-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-skillup-gradient opacity-5" />
            <div className="relative">
              <Star className="h-12 w-12 text-skillup-accent mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Test Your Skills?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have improved their skills and advanced their careers with SkillUp.
              </p>
              <Link
                to="/test"
                className="skillup-button inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Begin Assessment</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
